'use server';
import { routeComment as routeCommentFlow, type RouteCommentInput, type RouteCommentOutput } from '@/ai/flows/route-comments';

export async function handleCommentSubmission(input: RouteCommentInput): Promise<RouteCommentOutput> {
  try {
    // Simulate a slight delay for AI processing if needed for UX, otherwise remove.
    // await new Promise(resolve => setTimeout(resolve, 1500)); 
    const result = await routeCommentFlow(input);
    return result;
  } catch (error) {
    console.error("Error routing comment:", error);
    if (error instanceof Error && (
        /api key|credential|permission|authentication|unauthenticated/i.test(error.message) ||
        (typeof (error as any).status === 'number' && ((error as any).status === 401 || (error as any).status === 403))
      )
    ) {
      throw new Error("AI processing failed. This might be due to a missing or invalid API key in your .env file, or insufficient permissions. Please check your Genkit configuration and ensure GOOGLE_API_KEY (or equivalent) is set in .env.");
    }
    throw new Error("Failed to process comment with AI. Please try again or check server logs for more details.");
  }
}
