angular.module('benchmarket', [])

.directive('loginOut', LoginOut)
.directive('filterUserHost', FilterUserHost)
.directive('filterRepository', FilterRepository)
.directive('setSpan', SetSpan)
.directive('displayTestfiles', DisplayTestfiles)
.directive('displayTests', DisplayTests)
.directive('displayMetrics', DisplayMetrics)

.service('clientSession', ClientSession)
