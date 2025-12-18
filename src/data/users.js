const DUMMY_USERS = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin',
        rolePermission: [
            'dashboard: view',
            'setting: view',
            'setting: edit',
            'profile: view',
            'profile: edit',
            'user: view',
            'user: edit'
        ],
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'supervisor',
        rolePermission: [
            'dashboard: view',
            'user: view',
            'user: edit',
            'profile: view',
            'profile: edit'
        ],
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 3,
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        password: 'password',
        role: 'supervisor',
        rolePermission: [
            'dashboard: view',
            'user: view',
            'user: edit',
            'profile: view',
            'profile: edit'
        ],
        status: 'inactive',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 4,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password',
        role: 'viewer',
        rolePermission: [
            'dashboard: view',
            'user: view',
            'profile: view',
            'profile: edit'
        ],
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 5,
        name: 'John Doe',
        email: 'john1@example.com',
        password: 'password',
        role: 'supervisor',
        rolePermission: [
            'dashboard: view',
            'user: view',
        ],
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    }
];

export default DUMMY_USERS;