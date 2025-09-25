import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";

const BusinessServices = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showAddService, setShowAddService] = useState(false);
  const [showEditService, setShowEditService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Haircut',
      description: 'Professional haircut and styling',
      price: 50
    },
    {
      id: '2',
      name: 'Hair Color',
      description: 'Full hair coloring service',
      price: 120
    }
  ]);

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: ''
  });

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: ''
  });


  const handleAddService = () => {
    if (serviceForm.name && serviceForm.price) {
      const newService = {
        id: Date.now().toString(),
        name: serviceForm.name,
        description: serviceForm.description,
        price: parseFloat(serviceForm.price)
      };
      setServices([...services, newService]);
      setServiceForm({ name: '', description: '', price: '' });
      setShowAddService(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setEditForm({
      name: service.name,
      description: service.description,
      price: service.price.toString()
    });
    setShowEditService(true);
  };

  const handleUpdateService = () => {
    if (editForm.name && editForm.price && editingService) {
      const updatedService = {
        ...editingService,
        name: editForm.name,
        description: editForm.description,
        price: parseFloat(editForm.price)
      };
      setServices(services.map(s => s.id === editingService.id ? updatedService : s));
      setShowEditService(false);
      setEditingService(null);
      setEditForm({ name: '', description: '', price: '' });
    }
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Services</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={showAddService} onOpenChange={setShowAddService}>
            <DialogTrigger asChild>
              <Button className="bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="service-name">Service Name</Label>
                  <Input
                    id="service-name"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <Label htmlFor="service-description">Description</Label>
                  <Textarea
                    id="service-description"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                    placeholder="Enter service description"
                  />
                </div>
                <div>
                  <Label htmlFor="service-price">Price ($)</Label>
                  <Input
                    id="service-price"
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    placeholder="Enter price"
                  />
                </div>
                <Button onClick={handleAddService} className="w-full bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white">
                  Add Service
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-[#1A1A1A]">${service.price}</span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first service</p>
            <Button 
              onClick={() => setShowAddService(true)}
              className="bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Service Modal */}
      <Dialog open={showEditService} onOpenChange={setShowEditService}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-service-name">Service Name</Label>
              <Input
                id="edit-service-name"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                placeholder="Enter service name"
              />
            </div>
            <div>
              <Label htmlFor="edit-service-description">Description</Label>
              <Textarea
                id="edit-service-description"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                placeholder="Enter service description"
              />
            </div>
            <div>
              <Label htmlFor="edit-service-price">Price ($)</Label>
              <Input
                id="edit-service-price"
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                placeholder="Enter price"
              />
            </div>
            <Button onClick={handleUpdateService} className="w-full bg-[#4B2AAD] hover:bg-[#3B1F8B] text-white">
              Update Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessServices;
