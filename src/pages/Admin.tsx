
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Home, 
  Users, 
  FileSpreadsheet, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  Settings 
} from 'lucide-react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('submissions');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data for form submissions
  const [submissions] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-0123',
      website: 'mycompany.com',
      preferredMethod: 'Email',
      message: 'Need a new website for my business',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@startup.com',
      phone: '555-0456',
      website: 'startup.com',
      preferredMethod: 'Phone',
      message: 'Looking for e-commerce solution',
      date: '2024-01-14'
    }
  ]);

  // Sample categories data
  const [categories, setCategories] = useState([
    { id: 1, name: 'E-commerce', count: 5 },
    { id: 2, name: 'Portfolio', count: 3 },
    { id: 3, name: 'Business', count: 7 },
    { id: 4, name: 'Blog', count: 2 }
  ]);

  // Sample portfolio items
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: 'Modern E-commerce Store',
      description: 'A sleek online store with payment integration',
      category: 'E-commerce',
      image: '/placeholder.svg',
      projectLink: 'https://example.com',
      features: ['Responsive Design', 'Payment Integration', 'Admin Panel']
    },
    {
      id: 2,
      title: 'Creative Portfolio',
      description: 'Artist portfolio with gallery and contact form',
      category: 'Portfolio',
      image: '/placeholder.svg',
      projectLink: 'https://example.com',
      features: ['Image Gallery', 'Contact Form', 'Mobile Optimized']
    }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    projectLink: '',
    features: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '0000') {
      setIsAuthenticated(true);
      toast({
        title: 'Welcome!',
        description: 'Successfully logged into admin dashboard.',
      });
    } else {
      toast({
        title: 'Access Denied',
        description: 'Incorrect password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const exportToGoogleSheets = () => {
    // Simulate Google Sheets export
    toast({
      title: 'Exporting to Google Sheets',
      description: 'Form submissions are being exported...',
    });
    // In a real implementation, this would integrate with Google Sheets API
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategory,
        count: 0
      };
      setCategories([...categories, newCat]);
      setNewCategory('');
      toast({
        title: 'Category Added',
        description: `Category "${newCategory}" has been created.`,
      });
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: 'Category Deleted',
      description: 'Category has been removed.',
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real implementation, this would upload to a server or cloud storage
      toast({
        title: 'Image Uploaded',
        description: `Image "${file.name}" has been uploaded.`,
      });
    }
  };

  const addPortfolioItem = () => {
    if (newItem.title && newItem.description) {
      const item = {
        ...newItem,
        id: portfolioItems.length + 1,
        image: '/placeholder.svg',
        features: newItem.features.split(',').map(f => f.trim())
      };
      setPortfolioItems([...portfolioItems, item]);
      setNewItem({
        title: '',
        description: '',
        category: '',
        projectLink: '',
        features: ''
      });
      toast({
        title: 'Portfolio Item Added',
        description: 'New portfolio item has been created.',
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-charcoal">
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter password to access admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full btn-luxury">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="text-charcoal border-charcoal hover:bg-charcoal hover:text-cream"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-luxury py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-charcoal">Admin Dashboard</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="text-charcoal border-charcoal hover:bg-charcoal hover:text-cream"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="text-charcoal border-charcoal hover:bg-charcoal hover:text-cream"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Form Submissions
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Portfolio
            </TabsTrigger>
          </TabsList>

          {/* Form Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Client Form Submissions</CardTitle>
                    <CardDescription>
                      View and manage all contact form submissions
                    </CardDescription>
                  </div>
                  <Button onClick={exportToGoogleSheets} className="btn-luxury">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export to Google Sheets
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Preferred Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>{submission.email}</div>
                            <div className="text-sm text-gray-500">{submission.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{submission.website}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{submission.preferredMethod}</Badge>
                        </TableCell>
                        <TableCell>{submission.date}</TableCell>
                        <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Category</CardTitle>
                  <CardDescription>Create new portfolio categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button onClick={addCategory} className="btn-luxury">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Categories</CardTitle>
                  <CardDescription>Edit or remove existing categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Project Count</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.count}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => deleteCategory(category.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Portfolio Item</CardTitle>
                  <CardDescription>Create new portfolio projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        placeholder="Project title"
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="Category"
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Project description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectLink">Project Link</Label>
                    <Input
                      id="projectLink"
                      placeholder="https://example.com"
                      value={newItem.projectLink}
                      onChange={(e) => setNewItem({...newItem, projectLink: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="features">Features (comma separated)</Label>
                    <Input
                      id="features"
                      placeholder="Responsive Design, Payment Integration, Admin Panel"
                      value={newItem.features}
                      onChange={(e) => setNewItem({...newItem, features: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Upload Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <Button onClick={addPortfolioItem} className="btn-luxury">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Portfolio Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Portfolio Items</CardTitle>
                  <CardDescription>Edit or remove existing portfolio projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {portfolioItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <div className="flex gap-2 mb-2">
                              <Badge>{item.category}</Badge>
                              {item.features.map((feature, index) => (
                                <Badge key={index} variant="outline">{feature}</Badge>
                              ))}
                            </div>
                            <a 
                              href={item.projectLink} 
                              className="text-blue-600 hover:underline text-sm"
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {item.projectLink}
                            </a>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
