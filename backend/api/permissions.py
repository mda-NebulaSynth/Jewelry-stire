from rest_framework import permissions


class IsAdminOrManager(permissions.BasePermission):
    """
    Custom permission to only allow admins and managers.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role in ['admin', 'manager']
        )


class IsAdminOrStaff(permissions.BasePermission):
    """
    Custom permission to only allow admins and staff members.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role in ['admin', 'manager', 'staff']
        )


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or admins to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner or admin
        return obj.user == request.user or request.user.role == 'admin'
