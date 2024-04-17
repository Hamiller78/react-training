import React from "react";
import Consultant from "../entities/Consultant";

interface ConsultantContextType {
  consultants: Consultant[];
  setConsultants: React.Dispatch<React.SetStateAction<Consultant[]>> | null;
}

const ConsultantContext = React.createContext<ConsultantContextType>({
  consultants: [],
  setConsultants: null,
});

export default ConsultantContext;
