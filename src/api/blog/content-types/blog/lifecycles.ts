export default {
  // Runs automatically before a new blog entry is saved to the database
  beforeCreate(event) {
    const { data } = event.params;

    // If the user did not manually select a date, auto-fill with the current date/time
    if (!data.blogPublishDay) {
      data.blogPublishDay = new Date();
    }
  },
};
