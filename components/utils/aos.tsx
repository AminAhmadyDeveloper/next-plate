'use client';

import cloneDeep from 'lodash.clonedeep';

import { type FC, Fragment } from 'react';

import { useIsMounted } from '@/hooks/use-is-mounted';

const IS_SERVER = typeof window === 'undefined';

export const Aos: FC<ReactDiv> = (props) => {
  const isMounted = useIsMounted();

  const ssrSupportProps = cloneDeep(props);

  if (IS_SERVER) {
    delete ssrSupportProps['data-aos'];
    delete ssrSupportProps['data-aos-offset'];
    delete ssrSupportProps['data-aos-delay'];
    delete ssrSupportProps['data-aos-duration'];
    delete ssrSupportProps['data-aos-easing'];
    delete ssrSupportProps['data-aos-mirror'];
    delete ssrSupportProps['data-aos-once'];
    delete ssrSupportProps['data-aos-anchor-placement'];
  }

  return (
    <Fragment>
      <noscript>
        <div {...ssrSupportProps} />
      </noscript>
      {isMounted && <div {...props} />}
    </Fragment>
  );
};
