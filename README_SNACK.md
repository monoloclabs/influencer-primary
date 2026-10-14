This branch contains a minimal Expo-compatible, mobile-first version of the Influencer app trimmed for Snack/Expo Go.

How to import into Expo Snack:
1. Open https://snack.expo.dev
2. Menu → Import from GitHub
3. Paste this repo branch URL: https://github.com/monoloclabs/influencer-primary/tree/snack-trimmed

Notes about notifications and iOS:
- The app uses expo-notifications to schedule local notifications (a 5s test notification). Local scheduling works in many cases in Expo Go on device.
- Push notifications (remote) require configuring push credentials and usually a built app (EAS/Create.xyz) or a custom dev client — they will not fully work just inside Snack/Expo Go without that.
- To test real push notifications on iOS you can use Create.xyz or build a dev client / standalone app and provide the APNs credentials.

If you want I can:
- Add more of your original UI/screens from the repo (I can copy specific components) — tell me which files to bring in.
- Create a small README with exact build instructions for pushing to a TestFlight / Create.xyz.
