import React, { createContext, useState, useEffect } from "react";
import Consultant from "../entities/Consultant";
import ConsultantService from "../services/ConsultantService";

interface ConsultantContextType {
  consultants: Consultant[];
  updateConsultants: (newConsultants: Consultant[]) => void;
}

interface ConsultantProviderProps {
  children: React.ReactNode;
}

const consultantService = new ConsultantService();
const initialState = consultantService.createInitialState();

export const ConsultantContext = createContext<ConsultantContextType>({
  consultants: initialState,
  updateConsultants: () => {}, // placeholder function
});

export const ConsultantProvider: React.FC<ConsultantProviderProps> = ({
  children,
}) => {
  const [consultants, setConsultants] = useState(() => {
    const storedConsultants = sessionStorage.getItem("consultants");
    return storedConsultants ? JSON.parse(storedConsultants) : initialState;
  });

  const updateConsultants = (newConsultants: Consultant[]) => {
    setConsultants(newConsultants);
    sessionStorage.setItem("consultants", JSON.stringify(newConsultants));
  };

  useEffect(() => {
    sessionStorage.setItem("consultants", JSON.stringify(consultants));
  }, [consultants]);

  return (
    <ConsultantContext.Provider value={{ consultants, updateConsultants }}>
      {children}
    </ConsultantContext.Provider>
  );
};

export default ConsultantContext;
