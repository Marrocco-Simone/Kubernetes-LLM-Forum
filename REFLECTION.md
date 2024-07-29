# Explanation of the app

By launching the app via the docker compose file, it is possible to see the forum and interact with it.

The commands to launch the application, both in prod and dev mode, are written in their sh files. Similar scripts to launch all the tests are aviable too.

The application is done following all 12 functionalities to pass with merits.

# Functionalities

For the frontend, the user id is created and stored in the localstorage (3).

The application allows to do all the basic functionalities (1): see courses, choose course see questions, add new question, choose question and see answer and add new answer. You can upvote questions both on the main and its own page, where you can also upvote its answers. Upvoting or downvoting twice removes the vote, instead of giving a second one.

The questions and answers are sorted based on the last update (creation or last vote). Only 20 are first returned, and there is an infinite scroll functionality to fetch new ones (9).

When a question is created, random votes are given and three answers are created in the background with an LLM (2). There is a reload button to see them manually when they are created.

An user can create a question or an answer only once every minute. If more are tried, an error is shown displaying how much to wait (8).

New questions, answers or votes automatically refresh the page and show the new content (10). Other users or LLM answers are not load automatically, but there are button to refresh only the relevant data instead of the full page. Since content is sorted by the most recent, new creations are automatically shown on top.

The application is deployable in three ways: docker compose, both in dev and prod mode (4), or kubernetes (11). The latter has a script to automatically load it using minikube at `launch_kubernetes.sh`. You can read more at `RUNNING.md`.

The database used is PosgreSQL, the schemas, starting data and indexes are created with flyway migrations (5). More information is in `DATABASE.md`

There are 5 test created with Playwright and 5 with k6, used to decide the best indexes (6). More informations on how to start them in their `README.md` in their folder.

The documentation is written (7) and the application was studied graphically to feel pleasing (12).

# Future works

The project could use caching as studied in the other project in order to improve performance.

By adding an user schema, completed with authentication method, we could add the functionalities of seeing one user content, updating or deleting it (for now, we just show an extra text for the personal content).

An admin page could be made to create new courses.

The application only works with docker, since all links are docker-compose or kubernetes specific. Putting this links in separated enviroment files could make the various parts deployable indipendently.

Unfortunately, one previous student experienced problems with the installation of the UI library `SweetAlert2`, which allowed the app to show nice popups and toast messages. For this project, then, we relied on no messages for success other than content reload and simple alerts for errors and infinite scrolling. The user experience is however much worse. A good version would use that or an equivalent library to communicate good feedback to the user.
