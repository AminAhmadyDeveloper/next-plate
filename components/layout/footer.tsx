import { CodeIcon } from '@radix-ui/react-icons';

import { ThemeSwitcher } from '@/components/core/theme-switcher';
import { Container } from '@/components/layout/container';

const githubUrl = 'https://github.com/iamtouha/next-lucia-auth';
const twitterUrl = 'https://twitter.com/iamtouha';

export const Footer = () => {
  return (
    <Container className="mt-4">
      <footer className="px-4 py-6">
        <div className="container flex items-center p-0">
          <CodeIcon className="mr-2 h-6 w-6" />
          <p className="text-sm">
            Built by{' '}
            <a className="underline underline-offset-4" href={twitterUrl}>
              iamtouha
            </a>
            . Get the source code from{' '}
            <a className="underline underline-offset-4" href={githubUrl}>
              GitHub
            </a>
            .
          </p>
          <div className="ml-auto">
            <ThemeSwitcher />
          </div>
        </div>
      </footer>
    </Container>
  );
};
