import { listOfFeatures } from '@/server/api/features/features-service';
import { router } from '@/trpc/server';

export const featuresRoute = router({
  listOfFeatures,
});
