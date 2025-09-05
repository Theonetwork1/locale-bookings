-- Add policies to allow business owners and clients to create transactions for legitimate appointments

-- Policy for business owners to create transactions for their business
CREATE POLICY "Business owners can create transactions for their business" 
ON public.transactions 
FOR INSERT 
WITH CHECK (
  is_business_owner(business_id) AND 
  (appointment_id IS NULL OR EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE id = appointment_id AND business_id = transactions.business_id
  ))
);

-- Policy for clients to create transactions for their own appointments
CREATE POLICY "Clients can create transactions for their appointments" 
ON public.transactions 
FOR INSERT 
WITH CHECK (
  auth.uid() = client_id AND 
  (appointment_id IS NULL OR EXISTS (
    SELECT 1 FROM public.appointments 
    WHERE id = appointment_id AND client_id = transactions.client_id
  ))
);