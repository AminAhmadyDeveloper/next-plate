import { listOfFeatures } from '@/server/api/routers/features/features-service';
import { router } from '@/trpc/server';

export const featuresRoute = router({
  listOfFeatures,
});
