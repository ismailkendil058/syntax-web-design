
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useFormSubmissions } from '@/hooks/useFormSubmissions';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState(['E-commerce', 'Portfolio', 'Corporate', 'Blog']);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submissions, exportToGoogleSheets, clearSubmissions } = useFormSubmissions();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0000') {
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
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
            <div className="bg-charcoal/5 p-6">
              <p className="text-charcoal/70 mb-4">Portfolio management features:</p>
              <ul className="space-y-2 text-charcoal/60">
                <li>• Upload and manage project images</li>
                <li>• Edit project titles and descriptions</li>
                <li>• Add project links and features</li>
                <li>• Organize projects by category</li>
              </ul>
              <div className="mt-6">
                <button className="btn-luxury">Add New Project</button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
