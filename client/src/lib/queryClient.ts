import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockPortfolioData, mockExperiences, mockProjects, mockSkills, mockContacts } from "@/data/mockData";

// Mock data mapping for static deployment
const mockDataMap: Record<string, any> = {
  "/api/portfolio": mockPortfolioData,
  "/api/experiences": mockExperiences,
  "/api/projects": mockProjects,
  "/api/skills": mockSkills,
  "/api/contacts": mockContacts,
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // For static deployment, simulate API responses
  if (mockDataMap[url]) {
    const mockData = method === "POST" && data ? [...mockDataMap[url], data] : mockDataMap[url];
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    
    // Return mock data for static deployment
    if (mockDataMap[url]) {
      return mockDataMap[url];
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
