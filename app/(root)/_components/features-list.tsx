'use client';

import type { FC } from 'react';
import { Fragment } from 'react';

import { Icon } from '@/components/core/icons';
import CardSpotlight from '@/components/extension/card-spotlight';
import { trpc } from '@/providers/trpc-provider';

export const FeaturesList: FC = () => {
  const [features] = trpc.features.listOfFeatures.useSuspenseQuery();

  return (
    <Fragment>
      {features?.map((feature) => {
        return (
          <CardSpotlight
            key={feature.name}
            name={feature.name}
            description={feature.description}
            logo={<Icon iconName={feature.logo} className="h-12 w-12" />}
          />
        );
      })}
    </Fragment>
  );
};
