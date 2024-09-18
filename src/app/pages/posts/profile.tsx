import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function Profile() {
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    // Fetch user profile
    // This is a placeholder, you'll need to implement the actual API call
    const fetchProfile = async () => {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setUsername(data.username);
      setDepartment(data.department);
      setYear(data.year);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This is a placeholder, you'll need to implement the actual API call
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, department, year }),
    });
    if (response.ok) {
      // Profile updated successfully
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Anonymous Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Select
          value={department}
          onValueChange={setDepartment}
          required
        >
          <Select.Option value="Computer Science">Computer Science</Select.Option>
          <Select.Option value="Electrical Engineering">Electrical Engineering</Select.Option>
          <Select.Option value="Mechanical Engineering">Mechanical Engineering</Select.Option>
          {/* Add more departments as needed */}
        </Select>
        <Select
          value={year}
          onValueChange={setYear}
          required
        >
          <Select.Option value="1">1st Year</Select.Option>
          <Select.Option value="2">2nd Year</Select.Option>
          <Select.Option value="3">3rd Year</Select.Option>
          <Select.Option value="4">4th Year</Select.Option>
        </Select>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}