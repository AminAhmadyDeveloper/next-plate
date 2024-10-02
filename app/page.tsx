import type { NextPage } from 'next';

import { Icon } from '@/components/ui/icon';
import { Aos } from '@/components/utils/aos';
import { redis } from '@/lib/redis-utils';
import { service } from '@/service/api-service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const MainPage: NextPage = async () => {
  let posts: Post[] = [];

  const cachedPosts = await redis.get<Post[]>('posts');

  if (!cachedPosts) {
    const { data } = await service<Post[]>('posts');
    if (data?.length) {
      posts = data;
      await redis.set('posts', JSON.stringify(data), { ex: 25 });
    }
  } else {
    posts = cachedPosts;
  }

  return (
    <Aos data-aos="fade-up">
      <Icon
        key="ph-airplane-takeoff"
        icon="ph-airplane-takeoff"
        variant="duotone"
        size="7xl"
      />
      {posts?.map((post) => {
        return <div key={post.title}>{post.body}</div>;
      })}
    </Aos>
  );
};

export default MainPage;
