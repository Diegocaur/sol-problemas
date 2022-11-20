import React, { useId } from "react";
import Select from "react-select";

export default function StableSelect({ ...props }) {
  return <Select {...props} instanceId={useId()} />;
}
/*React 18 presenta un useIdenlace para generar una ID que es segura para la hidratación (estable en los renderizados del cliente y del servidor) pero aún única a nivel mundial.
Puede usar este componente exactamente como Select, pero no generará ningún error de hidratación ya que su ID es estable.

*/
