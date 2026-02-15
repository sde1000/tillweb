tillweb — web interface for quicktill
=====================================

Installation
------------

Install the "tillweb" package from
https://quicktill.assorted.org.uk/software/pip/ into the venv on the
till server:

```
pip install --extra-index-url https://quicktill.assorted.org.uk/software/pip/ tillweb
```

You may find it convenient to symlink to the `tillweb` command from
`~/.local/bin/`:

```
ln -s venv/bin/tillweb ~/.local/bin/
```


Configuration
-------------

The package reads `~/.config/tillweb.toml` at startup. Example:

```
[django]
# Database settings — if using a file, specify an absolute path
database_engine = "django.db.backends.postgresql_psycopg2"
database_name = "tillweb"
#database_name = "/home/till/web/tillweb-database.sqlite3"

# Secret key used to encrypt session cookies, etc.
secret_key_file = "/home/till/.config/tillweb-secret-key"

# Allowed hostnames for access to the web interface; must be a list
allowed_hosts = []

# Filesystem location from which collected static files are served in
# production
staticfiles_dir = "/home/till/web/static/"

# Filesystem location from which media files are served in production
mediafiles_dir = "/home/till/web/media/"

# LANGUAGE_CODE setting
language_code = 'en-GB'

# Time zone
time_zone = "Europe/London"


[till]
database_name = "hmtest"
currency_symbol = "£"
site_name = "Haymakers test"

[front-page]
# What happens when a user visits the front page?
# Choose between:
# * "start-button" — a page with a button saying "Start" that links to the
#   till main menu
# * "redirect-to-till" — automatically redirect to the till main menu
mode = "redirect-to-till"

[oidc]
# OIDC can be disabled without deleting its configuration by setting
enabled = false

# OpenID Connect configuration — optional
# The OpenID Connect provider must support the following scopes:
# * openid
# * profile  (including the "preferred_username" claim)
# * email
# * groups  (non-standard; the "groups" claim must be a list of groups)

# OIDC provider name: used on the "Log in" button. Defaults to "OpenID Connect"
provider_name = "IPL account"

# Specify configuration_url or all of the endpoint URLs.
configuration_url = "https://www.individualpubs.co.uk/openid/.well-known/openid-configuration/"

# authorization_endpoint = "https://www.individualpubs.co.uk/openid/authorize/"
# token_endpoint = "https://www.individualpubs.co.uk/openid/token/"
# userinfo_endpoint = "https://www.individualpubs.co.uk/openid/userinfo"
# jwks_endpoint = "https://www.individualpubs.co.uk/openid/jwks/"

# token_signing_algorithm = "RS256"  # the default is RS256

client_id = 'REDACTED'
client_secret_file = "/home/steve/web/oidc-client-secret"

# token_refresh_interval = 3600  # in seconds, the default is 3600

# ALL of the groups in this list must be present for a user to be
# permitted to log in using OIDC. (If this list is empty, all users will
# be allowed access.)
required_groups = ["haymakers-till"]

# ALL of the groups in this list must be present for a user to be
# considered a superuser, addition to the required_groups. (If this
# list is empty, NO users will be superusers.)
superuser_groups = ["superuser"]

# ALL of the groups in this list must be present for a user to be
# considered "staff" and allowed to access the Django admin, in
# addition to the required_groups. (If this list is empty, NO users
# will be staff.)
staff_groups = ["staff"]

# A template for the user's home page at the OpenID Connect provider;
# "user" is the auth.User object. This will be used to link the user
# back to their home page when they log out and for the "Home" link in
# the breadcrumbs on most pages
user_home_page_template = "https://www.individualpubs.co.uk/users/{user.username}/"
```


Development
-----------

The tillweb repository does not include the packed Javascript and CSS
necessary for the project to run in `tillweb/static/bundles/`. To
regenerate these, you must have `npm` installed, and run:

```
npm install
npm run build
```

If you are generating a fresh tillweb sdist, ensure the bundles are up
to date — they will be included in the `.tar.gz` source
distribution. (This enables the sdist to be installed on systems that
don't have npm installed.)

The default Django settings module is the production settings. In
development, set the environment variable `DJANGO_SETTINGS_MODULE` to
`tillweb.config.settings`:

```
export DJANGO_SETTINGS_MODULE=tillweb.config.settings
```
