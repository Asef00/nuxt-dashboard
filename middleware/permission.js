export default function (context) {
  if (context.$auth.loggedIn) {
    if (context.route.meta[0].permission) {
      let result = context.$auth.user.permission_names.includes(context.route.meta[0].permission);
      if (!result) {
        console.log('No permission :)')
        context.redirect('/profile');
      }
    } else {
      return true;
    }
  }
}
