
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useFormSubmissions } from '@/hooks/useFormSubmissions';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('0000'); // Default admin password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [categories, setCategories] = useState(['E-commerce', 'Portfolio', 'Corporate', 'Blog']);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: '1',
      title: 'E-commerce Store',
      description: 'Modern online store with cart functionality',
      image: '/placeholder.svg',
      link: 'https://example.com',
      category: 'E-commerce',
      features: ['Responsive Design', 'Payment Integration', 'Admin Dashboard']
    }
  ]);
  const [editingPortfolio, setEditingPortfolio] = useState<string | null>(null);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    category: '',
    features: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submissions, exportToGoogleSheets, clearSubmissions } = useFormSubmissions();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === currentPassword) {
      setIsLoggedIn(true);
      toast({
        title: "Welcome to Admin Dashboard",
        description: "You are now logged in.",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Please check your password and try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    navigate('/');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 4) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 4 characters long.",
        variant: "destructive",
      });
      return;
    }
    setCurrentPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: "Password Updated",
      description: "Admin password has been successfully changed.",
    });
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      toast({
        title: "Category Added",
        description: `"${newCategory.trim()}" has been added to categories.`,
      });
    }
  };

  const deleteCategory = (category: string) => {
    setCategories(categories.filter(cat => cat !== category));
    toast({
      title: "Category Deleted",
      description: `"${category}" has been removed from categories.`,
    });
  };

  const startEditCategory = (category: string) => {
    setEditingCategory(category);
    setNewCategory(category);
  };

  const saveEditCategory = () => {
    if (editingCategory && newCategory.trim()) {
      const updatedCategories = categories.map(cat => 
        cat === editingCategory ? newCategory.trim() : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setNewCategory('');
      toast({
        title: "Category Updated",
        description: `Category has been updated to "${newCategory.trim()}".`,
      });
    }
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setNewCategory('');
  };

  const addPortfolioItem = () => {
    if (newPortfolioItem.title.trim() && newPortfolioItem.description.trim()) {
      const item = {
        id: Date.now().toString(),
        ...newPortfolioItem,
        features: newPortfolioItem.features.split(',').map(f => f.trim()).filter(f => f)
      };
      setPortfolioItems([...portfolioItems, item]);
      setNewPortfolioItem({
        title: '',
        description: '',
        image: '',
        link: '',
        category: '',
        features: ''
      });
      toast({
        title: "Portfolio Item Added",
        description: `"${item.title}" has been added to portfolio.`,
      });
    }
  };

  const deletePortfolioItem = (id: string) => {
    const item = portfolioItems.find(p => p.id === id);
    setPortfolioItems(portfolioItems.filter(p => p.id !== id));
    toast({
      title: "Portfolio Item Deleted",
      description: `"${item?.title}" has been removed from portfolio.`,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        if (editingPortfolio) {
          setPortfolioItems(portfolioItems.map(item =>
            item.id === editingPortfolio ? { ...item, image: imageUrl } : item
          ));
        } else {
          setNewPortfolioItem({ ...newPortfolioItem, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-charcoal/5 p-8 max-w-md w-full mx-4">
          <h1 className="heading-luxury text-3xl text-charcoal mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal transition-colors"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-luxury w-full"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-luxury-outline w-full"
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-luxury py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-luxury text-4xl text-charcoal">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="btn-luxury-outline"
            >
              Back to Home
            </button>
            <button
              onClick={handleLogout}
              className="btn-luxury"
            >
              Logout
            </button>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="heading-luxury text-2xl text-charcoal">Client Form Submissions</h2>
              <div className="flex gap-4">
                <button
                  onClick={exportToGoogleSheets}
                  className="btn-luxury"
                  disabled={submissions.length === 0}
                >
                  Export to CSV
                </button>
                <button
                  onClick={clearSubmissions}
                  className="btn-luxury-outline"
                  disabled={submissions.length === 0}
                >
                  Clear All
                </button>
              </div>
            </div>
            
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-charcoal/60">No form submissions yet.</p>
              </div>
            ) : (
              <div className="bg-white border border-charcoal/10 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Contact Method</TableHead>
                      <TableHead>Business URL</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.name} {submission.surname}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.phone}</TableCell>
                        <TableCell className="capitalize">{submission.contactMethod}</TableCell>
                        <TableCell>
                          {submission.businessUrl ? (
                            <a href={submission.businessUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {submission.businessUrl}
                            </a>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                        <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <h2 className="heading-luxury text-2xl text-charcoal">Manage Categories</h2>
            
            <div className="bg-charcoal/5 p-6 space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder={editingCategory ? "Edit category name" : "Add new category"}
                  className="flex-1 px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
                />
                {editingCategory ? (
                  <div className="flex gap-2">
                    <button onClick={saveEditCategory} className="btn-luxury">Save</button>
                    <button onClick={cancelEdit} className="btn-luxury-outline">Cancel</button>
                  </div>
                ) : (
                  <button onClick={addCategory} className="btn-luxury">Add Category</button>
                )}
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center justify-between bg-cream p-3 border border-charcoal/10">
                    <span className="text-charcoal">{category}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => startEditCategory(category)}
                        className="text-charcoal/60 hover:text-charcoal text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteCategory(category)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <h2 className="heading-luxury text-2xl text-charcoal">Portfolio Management</h2>
            
            {/* Add New Portfolio Item */}
            <div className="bg-charcoal/5 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-charcoal">Add New Portfolio Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newPortfolioItem.title}
                  onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                  className="px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
                />
                <select
                  value={newPortfolioItem.category}
                  onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, category: e.target.value })}
                  className="px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Project Description"
                value={newPortfolioItem.description}
                onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })}
                className="w-full px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
                rows={3}
              />
              <input
                type="url"
                placeholder="Project Link"
                value={newPortfolioItem.link}
                onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, link: e.target.value })}
                className="w-full px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
              />
              <input
                type="text"
                placeholder="Features (comma-separated)"
                value={newPortfolioItem.features}
                onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, features: e.target.value })}
                className="w-full px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
              />
              <div className="flex gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                <button onClick={addPortfolioItem} className="btn-luxury">Add Item</button>
              </div>
            </div>

            {/* Portfolio Items List */}
            <div className="space-y-4">
              {portfolioItems.map((item) => (
                <div key={item.id} className="bg-cream p-4 border border-charcoal/10 flex gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-charcoal">{item.title}</h4>
                    <p className="text-charcoal/70 text-sm">{item.description}</p>
                    <p className="text-charcoal/50 text-xs">Category: {item.category}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm">
                        View Project
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => deletePortfolioItem(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="heading-luxury text-2xl text-charcoal">Admin Settings</h2>
            
            <div className="bg-charcoal/5 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-4">Change Admin Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Current Password: {currentPassword}
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-cream border border-charcoal/20 text-charcoal focus:outline-none focus:border-charcoal"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-luxury">
                    Update Password
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-4">Website Management</h3>
                <div className="space-y-2 text-charcoal/70">
                  <p>• Total Form Submissions: {submissions.length}</p>
                  <p>• Total Categories: {categories.length}</p>
                  <p>• Total Portfolio Items: {portfolioItems.length}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
