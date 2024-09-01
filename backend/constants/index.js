const userRoles = Object.freeze({
  admin: 'admin',
  employee: 'employee',
});

const leaveStatus = Object.freeze({
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
});

module.exports = {
  userRoles,
  leaveStatus,
};
