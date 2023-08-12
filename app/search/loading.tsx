'use client'

import { Box } from "@/components/support_components"
import { ScaleLoader } from "react-spinners"

const loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
        <ScaleLoader color="#22c55e" />
    </Box>
  )
}

export default loading