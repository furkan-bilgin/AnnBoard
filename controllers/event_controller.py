from blinker import signal

new_post_signal = signal("new_post")
new_comment_signal = signal("new_comment")
new_report = signal("new_report")

remove_post_signal = signal("remove_post")
ban_user_signal = signal("ban_user")
pin_post_signal = signal("pin_post")

unpin_post_signal = signal("unpin_post")
distinguish_signal = signal("distinguish_signal")
undistinguish_signal = signal("undistinguish_signal")

delete_media_signal = signal("delete_media")