'use server';
/**
 * @fileOverview An AI agent that categorizes and routes comments left by workers when completing a task.
 *
 * - routeComment - A function that handles the comment routing process.
 * - RouteCommentInput - The input type for the routeComment function.
 * - RouteCommentOutput - The return type for the routeComment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteCommentInputSchema = z.object({
  comment: z.string().describe('The comment left by the worker.'),
  taskId: z.string().describe('The ID of the task the comment is associated with.'),
  workerId: z.string().describe('The ID of the worker who left the comment.'),
});
export type RouteCommentInput = z.infer<typeof RouteCommentInputSchema>;

const RouteCommentOutputSchema = z.object({
  category: z.enum(['request', 'notification', 'safety_hazard', 'record']).describe('The category of the comment.'),
  routeTo: z.string().optional().describe('The ID of the personnel to route the comment to, if applicable.'),
  message: z.string().describe('A message describing the routing decision.'),
});
export type RouteCommentOutput = z.infer<typeof RouteCommentOutputSchema>;

export async function routeComment(input: RouteCommentInput): Promise<RouteCommentOutput> {
  return routeCommentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeCommentPrompt',
  input: {schema: RouteCommentInputSchema},
  output: {schema: RouteCommentOutputSchema},
  prompt: `You are an AI assistant tasked with categorizing and routing comments left by construction workers after completing a task.

  Based on the comment, determine if it is a request, a notification, a potential safety hazard, or simply a comment to be added to the record.

  If the comment is a request, categorize it as such and determine the appropriate personnel to route it to.
  If the comment is a notification, categorize it as such and determine the appropriate personnel to notify.
  If the comment indicates a potential safety hazard, categorize it as such and determine the appropriate safety personnel to alert.
  If the comment is none of the above, categorize it as a record.

  Here is the comment:
  {{comment}}

  Here is the task ID:
  {{taskId}}

  Here is the worker ID:
  {{workerId}}

  Respond with a JSON object with the following keys:
  - category: (enum: request, notification, safety_hazard, record) The category of the comment.
  - routeTo: (string, optional) The ID of the personnel to route the comment to, if applicable. Omit if not applicable
  - message: (string) A message describing the routing decision.
  `,
});

const routeCommentFlow = ai.defineFlow(
  {
    name: 'routeCommentFlow',
    inputSchema: RouteCommentInputSchema,
    outputSchema: RouteCommentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
