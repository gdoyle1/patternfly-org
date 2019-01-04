# Guidelines

Please enforce these guidelines at all times. Small or large, call out what's incorrect.

Every line of code should appear to be written by a single person, no matter the number of contributors.

This set of rules generate some constraints and conventions. If you run into instances where a convention isn’t obvious or a solution could be handled in a few different ways, contact the PatternFly community, have a conversation about how to handle it and update this guidelines when needed.

## Separation of UI structure concerns

PatternFly is made out of isolated and modular structures that fall into 2 categories:

- Layouts
- Components

### Layouts

Layouts are the containers that allow for organizing and grouping its immediate children on the page.

- A layout never imposes padding or element styles on its children.

The classes are prefixed with `-l` (after the patterfly prefix `pf-`), for example: `.pf-l-split` or `.pf-l-stack`.

### Components

Components are modular and independent structures concerned with how a thing looks.

- A component always touches all four sides of its parent container.
- The component itself never has backgrounds, widths, floats or margins.
- Elements inside a component never use top margins. The first element touches the top of its component.
- Components should include semantic markup and necessary Aria tags to implement the [accessibility guidelines](accessibility-guide.md).

The parent container of a component is prefixed with `-c` (after the patterfly prefix `pf-`), for example: `.pf-c-alert` or `.pf-c-button`.

### When to create a new component

As a general rule, create an extension to an element with BEM modifiers if it’s a change of color or scale. If the change generates a new entity, then create a new component.

Repetition is better than the wrong abstraction.

## Additional features

### Utilities

PatternFly is made up of isolated components that don't allow dependencies. Therefore, the use of helpers or utility classes is discouraged.

However, from time to time it is recognized that an exception to the Patternfly styling may be needed for a special case. For those instances, utility classes are supplied to assist in allowing minor styling changes without creating the need for adding custom CSS.

A utility class is prefixed with `-u` (after the patterfly prefix `pf-`), for example: `.pf-u-align-content-center`.

### Demos

Demos show how components and layouts can be put together to build more complex structures.

- A demo never includes its own styles. If styling is necessary to implement a desired demo, then new components or layouts, or variants of the components or layouts used, should be created instead.
- A demo doesn't add any accessibility tags that aren't already in the components. All accessibility should be handled at the component level.

## Variables

PatternFly follows a two-layer theming system where **global variables** always inform **component variables**. Each one of those layers follow a set of very specific rules.

### Global variables

The main reason to have global variables is to maintain consistency. They adhere to the following rules:

- They are prefixed with the word `global` and follow the formula `--pf-global--concept--PropertyCamelCase--modifier--state`.
  - a `concept` is something like a `spacer` or `main-title`;
  - a `PropertyCamelCase` is something like `BackgroundColor` or `FontSize`.
  - a `modifier` is something like  `sm`, or `lg`;
  - and a `state` is something like  `hover`, or `expanded`;
- They are concepts, never tied to an element or component. This is incorrect: `--pf-global--h1--FontSize`, this is correct: `--pf-global--FontSize--3xl`.

For example a global variable setup would look like:

```scss

  /* --pf-global--concept--size */
  --pf-global--spacer--lg: .5rem;
  --pf-global--spacer--xl: 1rem;
  --pf-global--spacer--2xl: 2rem;

  /* --pf-global--PropertyCamelCase--modifier */
  --pf-global--FontSize--3xl: 2rem;
  --pf-global--FontSize--2xl: 1.8rem;
  --pf-global--FontSize--lg: 1rem;

  /* --pf-global--PropertyCamelCase--state */
  --pf-global--BackgroundColor--hover: #ccc;

  /* --pf-global--PropertyCamelCase--modifier */
  --pf-global--Color--100: #000;

  /* --pf-global--concept--modifier */
  --pf-global--primary-color--100: blue;
```

### Component variables

The second layer is scoped to themeable component custom properties. This setup allows for consistency across components, generates a common language between designers and developers, and gives granular control to authors. The rules are as follows:

- They follow this general formula `--pf-c-block__element--modifier--state--breakpoint--pseudo-element--PropertyCamelCase`.
  - `pf-c-block` refers to the block, usually the component or layout name (i.e., `pf-c-alert`).
  - `__element` refers to the element inside of the block (i.e., `__title`).
  - `modifier` refers to a modifier class such as `.pf-m-danger`, and is prefixed with `m-` in the component variable (i.e., `m-danger`)
  - `state` is something like `hover` or `active`.
  - `breakpoint` is a media query breakpoint such as `sm` for `$pf-global--breakpoint--xs`.
  - `pseudo-element` is one of either `before` or `after`.
- The value of a component variable is **always** defined by a global variable.
- It's possible to include multiple elements, modifiers, states, and breakpoints in a single component variable.
- The order of elements, modifiers, sttates, and breakpoints in the variable name should match the selector order.

For example:

```scss
/* Component scoped variables are always defined by global variables */
  --pf-c-alert--Padding: var(--pf-global--spacer--xl);
  --pf-c-alert--hover--BackgroundColor: var(--pf-global--BackgroundColor--200);
  --pf-c-alert__title--FontSize: var(--pf-global--FontSize--2xl);

/* --block--PropertyCamelCase */
.pf-c-alert {
  padding: var(--pf-c-alert--Padding);
}

/* --block--state--PropertyCamelCase */
.pf-c-alert {
  &:hover {
    background-color: var(--pf-c-alert--hover--BackgroundColor);
  }
}

/* --block__element--PropertyCamelCase */
.pf-c-alert__title {
  font-size: var(--pf-c-alert__title--FontSize);
}

/* A more complex example */
.pf-c-switch {
  @media (max-width: $pf-global--breakpoint--sm) {
    .pf-c-switch__input {
      &:disabled {
        ~ .pf-c-switch__toggle {
          &::before {
            background-color: var(--pf-c-switch--sm__input--disabled__toggle--before--BackgroundColor);
          }
        }
      }
    }
  }
}
```

### Comment all magic values

If a situation arises where a value needs entering into the style sheets that isn't already defined in the global variables this should serve as a red flag to you.

In the case where a 'magic' value needs entering, ensure a comment is added on the line above to explain its relevance.

## Harry Robert's Guidelines

PatternFly follows [Harry Robert's CSS Guidelines](https://cssguidelin.es/) with some exceptions, deviations and additions.

### Exceptions

PatternFly doesn't follow these rules:

- [Table of contents](https://cssguidelin.es/#able-of-contents)
- [Titling](https://cssguidelin.es/#titling)
- [Anatomy of a Ruleset](https://cssguidelin.es/#anatomy-of-a-ruleset)
- [Multi-line CSS](https://cssguidelin.es/#multi-line-css)
- [Indenting](https://cssguidelin.es/#indenting)
- [Meaningful Whitespace](https://cssguidelin.es/#meaningful-whitespace)
- [80 Characters Wide](https://cssguidelin.es/#characters-wide)

### Deviations from Harry Robert's Guidelines

#### HTML

**Practicality over purity**. Strive to maintain HTML standards and semantics, but not at the expense of practicality. Use the least amount of markup with the fewest intricacies whenever possible.

#### Comment and Organization

Code is written and maintained by people. Ensure your code is descriptive, well commented, and approachable by others. Great code comments convey context or purpose. Do not simply reiterate a component or class name.

Be sure to write in complete sentences for larger comments and succinct phrases for general notes.

Follow this comment structure:

1. Block
1. Sections
1. Line

```sass
// Section level Comment
.selector {
  line-height: 1.5; // Line level Comment
  color: #333;
}
```

##### 1. Section

This comment is a section divider or describes a block of code.

- Leave one blank lines above.

##### 2. Line

Describes a specific line of code.

### Additions to Harry Robert's Guidelines

#### Lintable CSS rules

The [CSS linter](https://stylelint.io/) is PatternFly's single source of truth for CSS syntax, declaration order, and other CSS rules like disallow type selectors, disallow vendor prefixes, and more.

#### Shorthand notation

Limit the use of shorthand declarations to instances where you must explicitly set all the available values. Common overused shorthand properties include:

- `padding`
- `margin`
- `font`
- `background`
- `border`
- `border-radius`

```sass
// Bad
.element {
  margin: 0 0 10px;
  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}

// Good
.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
```

The [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) and [Harry Robert](https://csswizardry.com/2016/12/css-shorthand-syntax-considered-an-anti-pattern/) both have great articles on shorthand properties for those unfamiliar with notation and behaviour.

### Sass

PatternFly uses [Sass](http://sass-lang.com/) to preprocess CSS.

As a general rule don't overcomplicate Sass, keep it easy to parse for a normal human.

#### Nesting

As a general rule avoid Sass nesting to increase specificity. Try not to nest more than three layers deep.

Limit nesting to the following use cases:

1. Modifiers
1. Media queries
1. States, pseudo-classes, and pseudo-elements
1. Combinators

##### 1. Modifiers and elements of a block

* Do not use [Sass’s parent selector](https://css-tricks.com/the-sass-ampersand/) mechanism to construct BEM elements.
* Do use that method to create compound selectors with modifier classes.

```sass
// Good
.pf-nav {
  ...

  &.pf-m-vertical {
    ...
  }
}

.pf-nav__item {
  ...
}

// Bad
.pf-nav {
  ...

  &__item {
    ...
  }
}

.pf-m-nav.pf-m-vertical {
  ...
}
```

##### 2. Media queries

Component-specific media queries should be nested inside the component block. Remember that PatternFly is mobile first. **Do progressive enhancement, not gracefully degradation.**

Patternfly has 5 breakpoints:

```scss
  $pf-global-breakpoint--xs: 0;
  $pf-global-breakpoint--sm: 576px;
  $pf-global-breakpoint--md: 768px;
  $pf-global-breakpoint--lg: 992px;
  $pf-global-breakpoint--xl: 1200px;
```

To make sure you are writing mobile first, always do `min-width`:

```scss
.pf-nav {
  ...

  // Styles for small view ports and up
  @media (min-width: $pf-global-breakpoint--xs) { ... }
}
```

##### 4. States, pseudo-classes and pseudo-elements

States of a component should be included as a nested element. This includes hover, focus, and active states:

```sass
.pf-c-button {
  background: var(--pf-c-button--Background);

  .pf-m-hover,
  :hover {
    background: var(--pf-c-button--hover--Background);
  }
}
```

Classes that duplicate a state should be named with the prefix `pf-m-`. For example, a class `.pf-m-active` can be used to apply the `:active` styling.

#### Sass variables

We create global Sass variables to keep a Bootstrap theme in sync. These values also inform our component level variables .

#### @mixin and @extend

Since our components are isolated and modular try to avoid `@mixin` and `@extend` because they generate a dependency.

## References

This guide is inspired by people we follow and respect:

- **[Mark Otto](http://markdotto.com/):** [Code Guideline](http://codeguide.co/)
- **[Robert Harris](http://csswizardry.com/):** [CSS Guidelines](http://cssguidelin.es/)
- **[Gravity Department](http://gravitydept.com/)**: [Style Guide Field Manual](http://manuals.gravitydept.com/code/css/style-guide)
- **[Hugo Giraudel](http://hugogiraudel.com/):** [SASS Guidelines](https://sass-guidelin.es/)