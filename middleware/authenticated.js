export default function (context) {
  if (context.$auth.loggedIn) {
    if (context.route.path === '/auth/forget-password') {
      context.$auth.redirect('home');
    }
  }
}
