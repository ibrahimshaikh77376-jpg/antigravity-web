        // --- CONFIGURATION ---
        // IMPORTANT: Replace this URL with your deployed Google Web App URL
        const API_URL = "https://script.google.com/macros/s/AKfycbxxTBmmbqwzq_DgkjdXE7Uj1cUIs4MLucSVSTcZ8EgmE2vodaRszoKHqe4z9Qqg8JI/exec";

        /**
         * API Service Helper
         * Uses POST 'text/plain' to avoid CORS preflight issues with GAS.
         * The GAS script accepts JSON in the body.
         */
        const apiService = async (action, payload = {}) => {
            try {
                // We use proper CORS handling. 
                // Ensure your Google Script is deployed as "Who has access: Anyone" => This is CRITICAL.

                const response = await fetch(API_URL, {
                    method: 'POST',
                    // We use text/plain to avoid preflight (OPTIONS) request which GAS does not support.
                    // The data is still JSON stringified.
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify({ action, payload })
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error("API Error Details:", error);

                // Fallback for debugging
                return {
                    success: false,
                    message: `Connection Failed: ${error.message}. Ensure 'Who has access' is set to 'Anyone' in GAS deployment.`
                };
            }
        };

        // --- COMPONENTS ---

        // 1. Loading Spinner
        const Spinner = () => (
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );

        // 2. Modal
        const Modal = ({ title, isOpen, onClose, children }) => {
            if (!isOpen) return null;
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <i data-lucide="x" className="w-5 h-5 text-gray-500"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[80vh]">
                            {children}
                        </div>
                    </div>
                </div>
            );
        };

        // 3. Login Page
        const LoginPage = ({ onLogin }) => {
            const [role, setRole] = useState('Admin'); // Admin, Employee, Client
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState('');

            useEffect(() => {
                if (window.lucide) window.lucide.createIcons();
            }, [role]);

            const handleSubmit = async (e) => {
                e.preventDefault();
                setError('');
                setLoading(true);

                const res = await apiService("LOGIN", { role, email, password });

                setLoading(false);
                if (res.success) {
                    onLogin(res.user, role);
                } else {
                    setError(res.message || "Invalid credentials. Please try again.");
                }
            };

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
                    <div className="absolute top-4 left-4 z-50">
                        <button onClick={() => showSection('home-view')} className="bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm font-medium transition-all flex items-center gap-2">
                            ← Back to Home
                        </button>
                    </div>

                    <div className="glass-react bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Portal Login</h1>
                            <p className="text-gray-500 mt-2">Secure Access Gateway</p>
                        </div>

                        {/* Role Selector */}
                        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                            {['Admin', 'Employee', 'Client'].map(r => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${role === r ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>

                        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400"><i data-lucide="user"></i></span>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        placeholder="user@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-400"><i data-lucide="lock"></i></span>
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
                            >
                                {loading ? 'Verifying...' : `Login as ${role}`}
                            </button>
                        </form>
                    </div>
                </div>
            );
        };

        // 4. Admin Dashboard Components
        const Input = ({ label, ...props }) => (
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input {...props} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:bg-gray-100" />
            </div>
        );

        const UserForm = ({ type, onSubmit, loading }) => {
            // General form for both Employee and Client
            const [formData, setFormData] = useState({
                Name: '', Email: '', Password: '', Phone: '', Designation: '', CompanyName: '', ProjectDetails: ''
            });

            const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

            const handleSubmit = (e) => {
                e.preventDefault();
                onSubmit(formData);
            };

            return (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="Name" label="Full Name" value={formData.Name} onChange={handleChange} required />
                    <Input type="email" name="Email" label="Email Address" value={formData.Email} onChange={handleChange} required />
                    <Input type="text" name="Password" label="Default Password" value={formData.Password} onChange={handleChange} required />

                    {type === 'Employee' && (
                        <>
                            <Input name="Phone" label="Phone Number" value={formData.Phone} onChange={handleChange} />
                            <Input name="Designation" label="Designation" value={formData.Designation} onChange={handleChange} />
                        </>
                    )}

                    {type === 'Client' && (
                        <>
                            <Input name="CompanyName" label="Company Name" value={formData.CompanyName} onChange={handleChange} />
                            <Input name="ProjectDetails" label="Project Details" value={formData.ProjectDetails} onChange={handleChange} />
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all"
                    >
                        {loading ? 'Saving...' : `Add New ${type}`}
                    </button>
                </form>
            );
        };

        const DataTable = ({ title, data, type, onEdit }) => {
            // Include password in view
            if (!data || data.length === 0) return <div className="text-gray-500 italic p-4">No {type.toLowerCase()}s found.</div>;

            const headers = Object.keys(data[0]);

            return (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-700">{title}</h3>
                        <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{data.length} Records</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3 text-red-500">Password</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">{type === 'Employee' ? 'Designation' : 'Company'}</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs">{row.ID}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900">{row.Name}</td>
                                        <td className="px-4 py-3 text-gray-500">{row.Email}</td>
                                        <td className="px-4 py-3 text-gray-500 font-mono">{row.Password}</td>
                                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">{row.Role}</span></td>
                                        <td className="px-4 py-3 text-gray-500">{type === 'Employee' ? row.Designation : row.CompanyName}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => onEdit(type, row)}
                                                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                                            >
                                                <i data-lucide="edit" className="w-3 h-3"></i> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };

        const AdminDashboard = ({ user, onLogout }) => {
            const [activeTab, setActiveTab] = useState('employees'); // employees, clients
            const [data, setData] = useState({ employees: [], clients: [] });
            const [loading, setLoading] = useState(false);
            const [isEditModalOpen, setIsEditModalOpen] = useState(false);
            const [editingUser, setEditingUser] = useState(null); // { type: 'Employee'|'Client', data: {} }

            useEffect(() => {
                fetchData();
                if (window.lucide) window.lucide.createIcons();
            }, []);

            useEffect(() => {
                if (window.lucide) window.lucide.createIcons();
            }, [data, activeTab]);

            const fetchData = async () => {
                setLoading(true);
                const res = await apiService("GET_ALL_DATA");
                if (res.success) {
                    setData(res.data);
                } else {
                    alert("Failed to fetch data: " + res.message);
                }
                setLoading(false);
            };

            const handleAddUser = async (type, formData) => {
                setLoading(true);
                const action = type === 'Employee' ? 'ADD_EMPLOYEE' : 'ADD_CLIENT';
                const payload = { ...formData, Role: type };

                const res = await apiService(action, payload);
                if (res.success) {
                    alert(`${type} added successfully! ID: ${res.id}`);
                    fetchData(); // Refresh table
                } else {
                    alert("Error: " + res.message);
                }
                setLoading(false);
            };

            const handleEditClick = (type, rowData) => {
                setEditingUser({ type, data: { ...rowData } });
                setIsEditModalOpen(true);
            };

            const handleUpdateUser = async (e) => {
                e.preventDefault();
                setLoading(true);
                const { type, data } = editingUser;
                const sheetTarget = type === 'Employee' ? 'Employees' : 'Clients';

                // Construct updates
                const res = await apiService("UPDATE_USER", {
                    sheetTarget,
                    id: data.ID,
                    updates: { ...data }
                });

                if (res.success) {
                    alert("Updated successfully!");
                    setIsEditModalOpen(false);
                    fetchData();
                } else {
                    alert("Update failed: " + res.message);
                }
                setLoading(false);
            };

            const handleEditChange = (e) => {
                setEditingUser({
                    ...editingUser,
                    data: { ...editingUser.data, [e.target.name]: e.target.value }
                });
            };

            return (
                <div className="flex min-h-screen bg-gray-50">
                    {/* Sidebar */}
                    <aside className="w-64 bg-white border-r border-gray-200">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-indigo-600">AdminPanel</h2>
                            <p className="text-sm text-gray-500">Welcome, {user.Name}</p>
                        </div>
                        <nav className="px-4 space-y-2">
                            <button onClick={() => setActiveTab('employees')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'employees' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <i data-lucide="users" className="w-5 h-5"></i> Employees
                            </button>
                            <button onClick={() => setActiveTab('clients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'clients' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                                <i data-lucide="user" className="w-5 h-5"></i> Clients
                            </button>
                        </nav>
                        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-100">
                            <button onClick={onLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
                                <i data-lucide="log-out" className="w-5 h-5"></i> Logout
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-8 overflow-y-auto">
                        <div className="max-w-6xl mx-auto">
                            <header className="flex justify-between items-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {activeTab === 'employees' ? 'Employee Management' : 'Client Management'}
                                </h1>
                                <button onClick={fetchData} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                    Refresh Data
                                </button>
                            </header>

                            {/* Add Form Section */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New {activeTab === 'employees' ? 'Employee' : 'Client'}</h3>
                                <UserForm
                                    type={activeTab === 'employees' ? 'Employee' : 'Client'}
                                    onSubmit={(fd) => handleAddUser(activeTab === 'employees' ? 'Employee' : 'Client', fd)}
                                    loading={loading}
                                />
                            </div>

                            {/* Data Table */}
                            {loading && !data.employees.length ? <Spinner /> : (
                                <DataTable
                                    title={`All ${activeTab === 'employees' ? 'Employees' : 'Clients'}`}
                                    data={activeTab === 'employees' ? data.employees : data.clients}
                                    type={activeTab === 'employees' ? 'Employee' : 'Client'}
                                    onEdit={handleEditClick}
                                />
                            )}
                        </div>
                    </main>

                    {/* Edit Modal */}
                    <Modal title={`Edit ${editingUser?.type}`} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                        {editingUser && (
                            <form onSubmit={handleUpdateUser} className="space-y-4">
                                <Input label="Full Name" name="Name" value={editingUser.data.Name} onChange={handleEditChange} required />
                                <Input label="Email" name="Email" value={editingUser.data.Email} onChange={handleEditChange} required />
                                <Input label="Password" name="Password" value={editingUser.data.Password} onChange={handleEditChange} required />

                                {editingUser.type === 'Employee' && (
                                    <>
                                        <Input label="Phone" name="Phone" value={editingUser.data.Phone} onChange={handleEditChange} />
                                        <Input label="Designation" name="Designation" value={editingUser.data.Designation} onChange={handleEditChange} />
                                    </>
                                )}
                                {editingUser.type === 'Client' && (
                                    <>
                                        <Input label="Company Name" name="CompanyName" value={editingUser.data.CompanyName} onChange={handleEditChange} />
                                        <Input label="Project Details" name="ProjectDetails" value={editingUser.data.ProjectDetails} onChange={handleEditChange} />
                                    </>
                                )}
                                <div className="pt-4 flex gap-3">
                                    <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium">{loading ? 'Updating...' : 'Save Changes'}</button>
                                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium">Cancel</button>
                                </div>
                            </form>
                        )}
                    </Modal>

                </div>
            );
        };

        // 5. Basic User/Client Dashboard (Placeholder for now)
        const UserDashboard = ({ user, role, onLogout }) => (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.Name}</h1>
                            <p className="text-indigo-600 font-medium">{role} Portal</p>
                        </div>
                        <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors">
                            Logout
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-2">My Profile</h3>
                            <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {user.Email}</p>
                            <p className="text-sm text-gray-600 mb-1"><strong>ID:</strong> {user.ID}</p>
                            {role === 'Employee' && <p className="text-sm text-gray-600"><strong>Designation:</strong> {user.Designation}</p>}
                            {role === 'Client' && <p className="text-sm text-gray-600"><strong>Company:</strong> {user.CompanyName}</p>}
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h3 className="font-bold text-green-800 mb-2">Project/Work Status</h3>
                            <p className="text-gray-600">No active updates available at the moment.</p>
                        </div>
                    </div>
                </div>
            </div>
        );

        // --- MAIN APP ---
        const App = () => {
            const [view, setView] = useState('login');
            const [user, setUser] = useState(null);
            const [role, setRole] = useState(null);

            const handleLogin = (userData, userRole) => {
                setUser(userData);
                setRole(userRole);
                if (userRole === 'Admin') setView('admin-dashboard');
                else setView('user-dashboard');
            };

            const handleLogout = () => {
                setUser(null);
                setRole(null);
                setView('login');
            };

            if (view === 'login') return <LoginPage onLogin={handleLogin} />;
            if (view === 'admin-dashboard') return <AdminDashboard user={user} onLogout={handleLogout} />;
            if (view === 'user-dashboard') return <UserDashboard user={user} role={role} onLogout={handleLogout} />;

            return <div>Loading...</div>;
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
