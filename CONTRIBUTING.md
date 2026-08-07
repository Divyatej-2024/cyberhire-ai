# Contributing Guidelines

Thank you for contributing to CyberHire AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/cyberhire-ai.git
cd cyberhire-ai

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run development server
npm run dev
```

## Code Style

### TypeScript

- Use strict TypeScript mode
- Add type annotations to all functions
- Use interfaces for object types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
}

function getUser(id: string): Promise<User> {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Use `React.forwardRef` for ref forwarding
- Memoize components when appropriate

```typescript
export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children }, ref) => (
  <button ref={ref}>{children}</button>
));
```

### CSS

- Use Tailwind CSS classes
- Use CSS modules for scoped styles
- Avoid inline styles

```typescript
<div className="flex items-center gap-4 p-6 rounded-lg">
  Content
</div>
```

### File Naming

- Components: PascalCase (Button.tsx)
- Utilities: camelCase (helpers.ts)
- Constants: UPPER_SNAKE_CASE (CONSTANTS.ts)
- Folders: kebab-case (components/ui/)

## Git Workflow

### Branch Naming

```
feature/feature-name
bugfix/bug-name
hotfix/hotfix-name
docs/documentation-name
```

### Commit Messages

Follow conventional commits:

```
feat: Add job filtering
fix: Fix application state update
docs: Update README
test: Add tests for Job service
chore: Update dependencies
```

### Pull Requests

1. Descriptive title
2. Clear description of changes
3. Reference related issues (#123)
4. Include screenshots if UI changes
5. Ensure all tests pass

Example PR description:

```markdown
## Description
Adds job filtering by location and work mode.

## Changes
- Added location input filter
- Added work mode dropdown
- Updated API to support filters
- Added tests for filtering

## Related Issues
Closes #123

## Screenshots
[Screenshot of new feature]
```

## Testing Requirements

### Unit Tests

```bash
npm test
```

Write tests for:
- Utility functions
- Services
- Custom hooks

```typescript
describe('filterJobs', () => {
  it('should filter jobs by location', () => {
    const jobs = [
      { title: 'Job 1', location: 'London' },
      { title: 'Job 2', location: 'Manchester' },
    ];
    const result = filterJobs(jobs, { location: 'London' });
    expect(result).toHaveLength(1);
  });
});
```

### Integration Tests

Test API endpoints and service interactions:

```typescript
describe('Job API', () => {
  it('should fetch jobs with filters', async () => {
    const response = await apiClient.get('/jobs?location=London');
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(5);
  });
});
```

### E2E Tests

```bash
npm run e2e
```

Test user workflows with Playwright.

## Linting & Formatting

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

Before committing:
```bash
npm run lint
npm run type-check
npm test
```

## Documentation

### Comments

Add comments for complex logic:

```typescript
// Calculate days until deadline
const daysUntil = (deadline: Date): number => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
```

### JSDoc

Document public functions:

```typescript
/**
 * Fetches applications for the current user
 * @param status - Filter by application status
 * @returns Promise resolving to array of applications
 */
export const fetchApplications = async (status?: string) => {
  // Implementation
};
```

### README

Update README if:
- Adding new features
- Changing installation steps
- Adding new dependencies

## Submitting Changes

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Code is properly commented
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Commit messages are descriptive

### Submission Process

1. Push changes to your fork
2. Create pull request with description
3. Address review comments
4. Ensure all CI checks pass
5. Maintainers will merge when ready

## Review Process

- Code review by at least one maintainer
- Automated tests must pass
- No merge conflicts
- Documentation updated if needed

## Common Issues

### Installation Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Database Issues

```bash
# Reset database
npx prisma migrate reset
npx prisma db push
npm run prisma:seed
```

## Questions?

- Open an issue for questions
- Check existing documentation
- Review related pull requests
- Ask in discussions

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to CyberHire AI! 🎉

