import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  HomeIcon, 
  MapPinIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, API } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phone: ''
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/api/profile');
      setProfile(data);
      setFormData({
        name: data.name,
        email: data.email,
        address: data.address || {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
          phone: ''
        }
      });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load profile');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/api/profile', formData);
      await fetchProfile();
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile - EMPORIUM</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Profile</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account information</p>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <UserCircleIcon className="h-16 w-16 text-gray-400" />
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {profile?.name}
                  </h2>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    {profile?.email}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Personal Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">{profile?.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center text-gray-900 dark:text-gray-100">
                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {profile?.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      {editing ? (
                        <div className="flex">
                          <PhoneIcon className="h-5 w-5 text-gray-400 mr-2 mt-2" />
                          <input
                            type="tel"
                            name="address.phone"
                            value={formData.address.phone}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-900 dark:text-gray-100">
                          <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {profile?.address?.phone || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Shipping Address
                      </h3>
                      <HomeIcon className="h-5 w-5 text-gray-400" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Street Address
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="123 Main St"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">{profile?.address?.street || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City
                        </label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="New York"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-gray-100">{profile?.address?.city || '—'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          State
                        </label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="NY"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-gray-100">{profile?.address?.state || '—'}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Country
                        </label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.country"
                            value={formData.address.country}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="United States"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-gray-100">{profile?.address?.country || '—'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          ZIP Code
                        </label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.zipCode"
                            value={formData.address.zipCode}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="10001"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-gray-100">{profile?.address?.zipCode || '—'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


                {editing && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          name: profile.name,
                          email: profile.email,
                          address: profile.address || {
                            street: '',
                            city: '',
                            state: '',
                            country: '',
                            zipCode: '',
                            phone: ''
                          }
                        });
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
