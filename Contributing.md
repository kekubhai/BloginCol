
# Contributing to [Techno-Blogs]

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to this project, hosted on [GitHub](https://github.com/yourusername/yourproject). These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document via a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Submitting Issues](#submitting-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Style Guide](#style-guide)
- [License](#license)

## Code of Conduct

This project and everyone participating in it are governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

We welcome contributions of all kinds. Here are some ways to help:

1. **Report Bugs**: If you encounter any bugs, please file an issue and include as much detail as possible.
2. **Propose New Features**: If you have an idea to enhance the project, feel free to open an issue to discuss it.
3. **Fix Bugs**: Take a look at existing issues and see if you can help resolve any.
4. **Improve Documentation**: You can always help by improving the project’s documentation.
5. **Add New Functionality**: Feel free to submit pull requests for new features, making sure they align with the project’s goals.

## Development Setup

To get started contributing, follow these steps:

### 1. Fork the Repository

Click the **Fork** button at the top-right corner of the repo page, and clone your fork locally:

```bash
git clone https://github.com/yourusername/yourproject.git
```

### 2. Install Dependencies

Install the dependencies by running:

```bash
npm install
```

Make sure you have the necessary environment variables set up for development. You may need to create a `.env` file and include values for variables like:

```bash
DATABASE_URL=your-prisma-database-url
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-api-key
```

### 3. Run the App Locally

Once the environment variables are set up, run the app:

```bash
npm run dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### 4. Database Setup (Prisma)

To set up the database using Prisma, run:

```bash
npx prisma migrate dev
```

### 5. Make Your Changes

- Make sure your changes follow the style guide outlined below.
- Ensure all tests pass before submitting a pull request.

## Submitting Issues

- **Search for Existing Issues**: Before submitting a new issue, please search to see if it already exists.
- **Provide Details**: When reporting a bug or suggesting a feature, provide as much detail as possible (e.g., screenshots, steps to reproduce, etc.).

## Submitting Pull Requests

1. **Fork the Repo**: Create a fork of the repository under your GitHub account.
2. **Create a New Branch**: Create a feature branch for your changes:
   
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**: Commit your changes and push them to your forked repository:
   
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**: Once your changes are ready, open a pull request from your forked repo back into the main project. Describe the changes you made and mention any related issues (if applicable).

## Style Guide

1. **Code Formatting**: Ensure your code adheres to the existing style in the project. We use `eslint` and `prettier` to enforce consistent style.
   
   To run the linter:
   ```bash
   npm run lint
   ```

2. **Commit Messages**: Follow a consistent commit message structure, e.g., `fix: corrected bug in post creation logic` or `feat: added image upload functionality`.

## License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers the project.

---

Feel free to adjust this guide based on your project’s needs!
