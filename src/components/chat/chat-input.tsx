import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Send } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';

const formSchema = z.object({
  content: z.string().min(1),
});

interface ChatInputProps {
  channelId: string;
  name: string;
}

const ChatInput = ({ channelId, name }: ChatInputProps) => {
  const { user } = useUser();
  const sendMessage = useMutation(api.messages.send);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendMessage({
        content: values.content,
        channelId,
        userId: user!.id,
      });

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-6 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </Button>
                  <Input
                    {...field}
                    placeholder={`Message #${name}`}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute top-6 right-8 h-[24px] w-[24px]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;