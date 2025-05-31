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
    // In a real app, you might want to log this error more robustly
    // and return a structured error object.
    throw new Error("Failed to process comment with AI. Please try again.");
  }
}
