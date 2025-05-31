'use client';
import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { handleCommentSubmission } from '@/app/actions'; // Server Action
import type { RouteCommentInput, RouteCommentOutput } from '@/ai/flows/route-comments';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  comment: z.string().min(5, { message: "Comment must be at least 5 characters." }).max(500),
  taskId: z.string().min(1, { message: "Task ID is required." }),
  workerId: z.string().min(1, { message: "Worker ID is required." }),
});

type FormData = z.infer<typeof formSchema>;

export function AiCommentRouter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<RouteCommentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      taskId: "task-demo-123", // Default or fetch dynamically
      workerId: "worker-demo-456", // Default or fetch dynamically
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmissionResult(null);
    try {
      const result = await handleCommentSubmission(data as RouteCommentInput);
      setSubmissionResult(result);
      toast({
        title: "Comment Processed by AI",
        description: (
          <div>
            <p>Category: {result.category}</p>
            {result.routeTo && <p>Routed to: {result.routeTo}</p>}
            <p>AI Message: {result.message}</p>
          </div>
        ),
        variant: "default",
      });
      form.reset(); // Reset form after successful submission
    } catch (error) {
      let errorMessage = "Failed to process comment.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>AI-Powered Comment Router</CardTitle>
        <CardDescription>Submit a task comment for AI categorization and routing.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter task completion comment..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="taskId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., TSK-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Worker ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., WRK-007" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Comment
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {submissionResult && (
        <CardContent className="mt-4 border-t pt-4">
          <h4 className="font-semibold">Last Submission Result:</h4>
          <pre className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">
            {JSON.stringify(submissionResult, null, 2)}
          </pre>
        </CardContent>
      )}
    </Card>
  );
}
