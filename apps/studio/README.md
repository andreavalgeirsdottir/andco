# Studio

This application includes a Sanity setup including the basics for a simple CMS setup.

## Guides

### Content grouping

By default, the setup comes with two groups of content:

- Settings
- Global Components
- Entities
- Pages

#### Settings

Settings are configuration/controls/setup for the application.

![](/docs/media/deskstructure_settings.png)

#### Global Components

Global Components are visual components that are used across the application (e.g. header, footer, etc).

![](/docs/media/deskstructure_global_components.png)

#### Entities

Entities are small isolated pieces of content that can be consumed.

![](/docs/media/deskstructure_entities.png)

#### Pages

Pages are content including an URL (slug) and will often include block building or some control over the visual representation over the page.

![](/docs/media/deskstructure_pages.png)

## Create new/Link to existing studio

```sh
yarn nx run studio:init
```
