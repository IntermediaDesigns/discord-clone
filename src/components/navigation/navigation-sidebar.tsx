import { useNavigate } from 'react-router-dom'
import { useQuery } from 'convex/react'
import { UserButton } from '@clerk/clerk-react'
import { Plus, Moon, Sun, Monitor } from 'lucide-react'

import { api } from '../../../convex/_generated/api'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { ScrollArea } from '../../components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../../components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import ServerItem from './server-item'
import { useTheme } from '../providers/theme-provider'

const NavigationSidebar = () => {
  const navigate = useNavigate()
  const servers = useQuery(api.servers.list)
  const { setTheme } = useTheme()

  return (
    <div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            className='group flex items-center'
            onClick={() => navigate('/')}
          >
            <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700'>
              <img
                src='/discord-logo.svg'
                alt='Discord'
                className='h-5 w-7 object-cover'
              />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right' className='text-sm'>
          Direct Messages
        </TooltipContent>
      </Tooltip>

      <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />

      <ScrollArea className='flex-1 w-full'>
        {servers?.map(server => (
          <div key={server._id} className='mb-4'>
            <ServerItem server={server} />
          </div>
        ))}
      </ScrollArea>

      <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
              className='h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden'
            >
              <Plus className='group-hover:text-white transition' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right' className='text-sm'>
            Create a server
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className='h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden'
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side='right' className='text-sm'>
              Change theme
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserButton
          afterSignOutUrl='/sign-in'
          appearance={{
            elements: {
              avatarBox: 'h-[48px] w-[48px]'
            }
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
