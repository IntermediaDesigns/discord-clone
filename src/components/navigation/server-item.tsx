import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ServerItemProps {
  server: {
    _id: string;
    name: string;
    imageUrl: string;
  };
}

const ServerItem = ({ server }: ServerItemProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/servers/${server._id}`);
  };

  return (
    <Tooltip>
      <TooltipTrigger onClick={onClick} className="group relative flex items-center">
        <div className={cn(
          'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
          params?.serverId !== server._id && 'group-hover:h-[20px]',
          params?.serverId === server._id ? 'h-[36px]' : 'h-[8px]'
        )} />
        <div className={cn(
          'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
          params?.serverId === server._id && 'bg-primary/10 text-primary rounded-[16px]'
        )}>
          <img
            src={server.imageUrl}
            alt={server.name}
            className="w-full h-full object-cover"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-sm">
        {server.name}
      </TooltipContent>
    </Tooltip>
  );
};

export default ServerItem;