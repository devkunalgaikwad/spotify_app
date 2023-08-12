
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gtncvhcwasxrwvgkgvny.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0bmN2aGN3YXN4cnd2Z2tndm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzAwMDIsImV4cCI6MjAwNjU0NjAwMn0.9nusTNRr-ArSmftkAtmuvvYvcB9EGe8-r8KGKm7vXtQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;