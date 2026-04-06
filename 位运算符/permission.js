// 位操作符在权限管理系统中的应用
const PERM = {
  READ: 1 << 0, //0001
  WRITE: 1 << 1, //0010
  DELETE: 1 << 2, //0100
  ADMIN: 1 << 3, //1000
};
// 将用户设置读和写权限
let userPerm = PERM.READ | PERM.WRITE;
console.log("初始化用户权限：", userPerm, userPerm.toString(2));
// 增加用户删除权限
userPerm |= PERM.DELETE;
console.log("增加用户删除权限：", userPerm, userPerm.toString(2));
// 删除用户删除权限
userPerm &= ~PERM.DELETE;
console.log("删除用户删除权限：", userPerm, userPerm.toString(2));
// 查看用户是否有写的权限
const hasWritePermission = (userPerm & PERM.WRITE) !== 0;
console.log("判断用户是否有写的权限：", hasWritePermission);
// 翻转某权限位 将0转为1 1转为0 也就是之前如果有写权限翻转之后就删除了写的权限，如果没有写的权限翻转之后就有了写的权限
// 慎用！！！！！！！！
userPerm ^= PERM.WRITE;
console.log("翻转之后用户权限为：", userPerm, userPerm.toString(2));
userPerm ^= PERM.WRITE;
console.log("再次翻转之后用户权限为：", userPerm, userPerm.toString(2));

/**
 * userPerm 用户的实际权限数值
 * permissions 多个权限数值
 * 判断某用户是否有那些权限
 */
function hasPermissions(userPerm, ...permissions) {
  const perms = permissions.reduce((pre, cur) => {
    return pre | cur;
  });
  return (userPerm & perms) === perms;
}
// 测试该函数
const userPerm2 = PERM.READ | PERM.DELETE;
console.log("判断用户是否有删除的权限", hasPermissions(userPerm2, PERM.DELETE));
console.log("判断用户是否有读的权限", hasPermissions(userPerm2, PERM.READ));
console.log(
  "判断用户是否有删除和读的权限",
  hasPermissions(userPerm2, PERM.DELETE, PERM.READ)
);
console.log(
  "判断用户是否有管理员的权限",
  hasPermissions(userPerm2, PERM.ADMIN)
);
/**
 * userPerm 用户的实际权限数值
 * permissions 多个权限数值
 * 给某用户添加权限
 */
function addPermissions(userPerm, ...permissions) {
  return permissions.reduce((pre, cur) => pre | cur, userPerm);
}
// test
let userPerm3 = PERM.READ;
console.log(
  (userPerm3 = addPermissions(userPerm3, PERM.WRITE)),
  hasPermissions(userPerm3, PERM.READ, PERM.WRITE)
);
/**
 * userPerm 用户的实际权限数值
 * permissions 多个权限数值
 * 给某用户删除权限
 */
function removePermissions(userPerm, ...permissions) {
  permissions.forEach((per) => {
    userPerm &= ~per;
  });
  return userPerm;
}
// test
let userPerm4 = PERM.READ | PERM.WRITE;

console.log((userPerm4 = removePermissions(userPerm4, PERM.WRITE, PERM.READ)));
/**
 * userPerm 用户的实际权限数值
 * permissions 多个权限数值
 * 将某用户权限翻转
 */
function togglePermissions(userPerm, ...permissions) {
  permissions.forEach((per) => {
    userPerm ^= per;
  });
  return userPerm;
}
// test
let userPerm5 = PERM.READ;
console.log((userPerm5 = togglePermissions(userPerm5, PERM.READ, PERM.WRITE)));
