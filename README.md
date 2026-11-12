# CoolConcept

A static Vue website organized into reusable layout components, routed page views,
shared data, and form logic. The layout uses a black-and-white base with selected cobalt, vermilion, and lime accents. Flags and product photos keep their original colors; hero, team, and portfolio images reveal color on hover.

## Run locally

Requires Node.js 18 or newer. From this folder:

```sh
npm start
```

Open http://localhost:5173. Stop the server with Ctrl+C. No dependency installation
or build step is required. Serve over HTTP rather than opening `index.html` as a
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

Upload this folder to static hosting, preserving relative paths. There is no
server application or build output. `scripts/serve.mjs` is a local preview server.

Vue and Vue Router are pinned CDN dependencies. Tailwind uses the existing runtime
CDN setup; Google Fonts also require internet access. All page images and the Cambodian flag are stored locally in `assets/images/`; source credits are in `assets/images/SOURCES.md`. For a
production build pipeline, bundle dependencies and compile Tailwind to static CSS.

The shop remains a visual demo: filters, Quick View, and Add to Bag are not wired.
Set your Telegram, Instagram, and Facebook profile URLs in `src/config/socials.js`. Blank URLs display the channel as coming soon instead of opening a fake link. Shared social styling is in `src/components/SocialLinks.js`. Requests use FormSubmit to email
`huothsitha@gmail.com`, with the visitor's email available for replies. Form state
resets when leaving the request page.

## Email request setup

The request form posts directly to `https://formsubmit.co/huothsitha@gmail.com`.
No Gmail password or API key is included in this project. The shared recipient and
endpoint are in `src/config/contact.js`.

1. Serve the website over HTTP(S), open `#/custom-orders`, and send an owner test
   request using your own contact details.
2. Check `huothsitha@gmail.com` (including Spam) for FormSubmit's activation email
   and click the confirmation link. Normal email delivery requires activation.
3. Submit another test and verify the message and optional attachment arrive.
   Reply to it to check the visitor's Reply-To address.

The form collects name, email, request type, project details, optional quantity,
phone/Telegram, deadline, budget, and one reference file. The file is posted as
`attachment`; allowed extensions are PNG, JPG, PDF, AI, and PSD, up to 10 MB.
FormSubmit receives and processes these details. Keep the default provider CAPTCHA
enabled; the redundant honeypot has been removed to avoid silent rejection from accidental autofill. The form explicitly supplies its page URL using `_url`. The browser opens the provider's
submission/spam-check page and returns to `#/request-sent` after processing.
The confirmation means submitted for processing, not independently verified Gmail
delivery. Activation and live delivery must be checked by the mailbox owner.

Required browser fields, whitespace checks, file checks, an offline error, and a
busy state help visitors submit a complete request. A failed provider/network
navigation may display the provider/browser's error page; visitors can return and
retry or use the direct email link. No local success state is fabricated before
the provider redirects back. Fields remain enabled during native submission so
the browser includes their values and attachments in the POST.

Local checks use mocked submission events and do not send real emails.

Provider documentation: https://formsubmit.co/ and
https://formsubmit.co/documentation

## FormSubmit delivery diagnosis

Open `/email-test.html` on the published website and manually submit the minimal
browser test, completing the provider CAPTCHA if shown. The page deliberately
omits attachments, `_honey`, and `_next` to keep the provider result visible.
Check the recipient Gmail for both a test message and an activation email. Email
activation must be completed by the mailbox owner. A provider success response
is not proof that Gmail received the message. If neither email arrives after the
browser test, contact https://formsubmit.co/support with the recipient and form URL.
