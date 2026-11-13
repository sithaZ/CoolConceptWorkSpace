# CoolConcept

A static Vue website organized into reusable layout components, routed page views,
shared data, and form logic. The layout uses a black-and-white base with selected cobalt, vermilion, and lime accents. Flags and product photos keep their original colors; hero, team, and portfolio images reveal color on hover.

## Run locally

Requires Node.js 18 or newer. From this folder:

```sh
npm install
npm start
```

Open http://localhost:5173. Stop the server with Ctrl+C. The prestart script copies
the installed EmailJS SDK into local browser assets. Serve over HTTP rather than opening `index.html` as a
file: browsers restrict ES module loading from `file://` URLs.

## Folder structure

```text
CoolConcept/
├── index.html                 # HTML entry and external libraries
├── package.json               # Local server and test commands
├── assets/images/             # Local image assets
├── scripts/serve.mjs           # Local development server
├── src/
│   ├── main.js                # Vue app shell and startup
│   ├── components/            # Shared header and footer
│   ├── views/                 # One component per page
│   ├── router/index.js        # Route definitions and navigation behavior
│   ├── composables/           # Reusable reactive logic (quote form)
│   ├── data/catalog.js        # Demo products, projects, reviews, services
│   ├── styles/main.css        # Global styles and accessibility helpers
│   └── config/tailwind.js     # Existing theme configuration
└── tests/                     # Route, data wiring, and form checks
```

## Routes

| URL fragment | View |
| --- | --- |
| `#/` | Home |
| `#/shop` | Shop |
| `#/custom-orders` | Project request form |
| `#/request-sent` | Submission confirmation |
| `#/portfolio` | Portfolio |
| `#/services` | Services |
| `#/about` | About |
| `#/contact` | Contact |
| `#/orders` | Redirect to `#/custom-orders` |
| Any unknown route | Not found page |

Vue Router uses hash history, so refreshing and sharing links work on static
hosting without server rewrite rules. Browser Back/Forward works normally. Route
changes update the document title, close mobile navigation, and move focus to the
main content; new navigation scrolls to the top and Back restores saved scroll.

To add a page, create a view in `src/views/`, register it in `src/router/index.js`,
and add a navigation link where appropriate.

## Validation

```sh
npm test
```

## Hosting and current limits

Run `npm run build` and upload `dist/` to static hosting, preserving relative paths.
There is no server application. `scripts/serve.mjs` is a local preview server.

Vue and Vue Router are pinned CDN dependencies. Tailwind uses the existing runtime
CDN setup; Google Fonts also require internet access. All page images and the Cambodian flag are stored locally in `assets/images/`; source credits are in `assets/images/SOURCES.md`. For a
production build pipeline, bundle dependencies and compile Tailwind to static CSS.

The shop remains a visual demo: filters, Quick View, and Add to Bag are not wired.
Set your Telegram, Instagram, and Facebook profile URLs in `src/config/socials.js`. Blank URLs display the channel as coming soon instead of opening a fake link. Shared social styling is in `src/components/SocialLinks.js`.

## EmailJS contact and quotation requests

Both `#/contact` and `#/custom-orders` use `src/components/InquiryForm.js` and
`src/composables/useQuoteForm.js`. The quotation form retains optional reference
links, deadlines, budgets, and merchandise categories. No attachments are uploaded.

Public configuration lives in `src/config/emailjs.js`: service `service_rt590wg`,
template `template_pntrodx`, and the supplied public key. This static Vue project
has no bundler or environment variable injection, so these frontend identifiers
are intentionally public. Never put a private key, email password, or access token
there. The SDK is installed from npm and copied locally by `scripts/prepare-vendor.mjs`
before start, test, and build; no additional runtime CDN is used for EmailJS.

Each valid submission makes one EmailJS SDK send call, following the
[official send API](https://www.emailjs.com/docs/sdk/send/), with exactly
`name`, `email`, and `message` as template parameters. Phone, service,
quantity, deadline, budget, reference URL, and project details are combined in
`message`. No second email or auto-reply template is called by the website.
Configure the template's destination in EmailJS and use `{{email}}` for Reply-To.
Ensure its content uses `{{name}}`, `{{email}}`, and `{{message}}`.

The form validates required fields, email, quantity, and reference URL. It disables
controls while sending, prevents concurrent requests across pages, preserves data
on errors, and resets only after EmailJS returns status 200. The requested success
message appears inline in a black-and-white announcement. API acceptance does not
guarantee inbox delivery. There is no automatic retry after uncertain failures.
The legacy confirmation URL redirects to the quote form unless this page session
has received an accepted EmailJS response.

### Build and automated checks

Run `npm test` and `npm run build`. There is no configured lint command.
The build copies the static website, including the npm SDK assets, into `dist/`.
Deploy `dist/` to static hosting with all relative paths preserved.
Automated tests use the real EmailJS SDK with mocked fetch responses and send no email.

### Manual testing

1. Run `npm install` then `npm start`; open http://localhost:5173/#/contact.
2. Try blank required fields, an invalid email, and an invalid quantity; no email request should occur.
3. Enter your own test details and select a service. Submit once. In browser DevTools,
   check that exactly one POST goes to `https://api.emailjs.com/api/v1.0/email/send`
   with the configured service/template/key and only the three template parameters.
4. While pending, verify the button says "Sending..." and further submission is blocked.
5. After a 200 response, verify the full requested confirmation text appears, all
   fields reset, and the button becomes available again. Check EmailJS Email History
   and the configured recipient's inbox separately to confirm actual delivery.
6. Repeat on `#/custom-orders` including optional quote fields, and verify their
   values appear within the email's message.
7. Use DevTools offline mode or request blocking to simulate failure. Verify that
   no success message appears, entered details remain, and you can retry after recovery.
8. Check keyboard navigation, input labels, focus rings, and layouts at mobile,
   tablet, and desktop widths. If you configured an EmailJS domain allowlist,
   include the production hostname and your local testing origin as needed.
