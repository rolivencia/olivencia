interface Link {
  description: string;
  name: string;
  icon?: string;
  route: string;
  type: 'internal' | 'external';
}

interface SocialLink extends Link {
  icon: string;
  type: 'external';
}
