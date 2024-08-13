import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, role_id, password, confirmPassword } = req.body;

    // Log the received data to the console
    console.log('Received data:', { email, role_id, password, confirmPassword });

    // Simulate a successful response
    return res.status(200).json({ message: 'Signup successful!' });
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
