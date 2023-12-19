export async function fetchRoles(token) {
  try {
    const response = await fetch('http://77.73.69.213:5000/roles', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data.roles;
    } else {
      throw new Error('Failed to fetch roles');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}