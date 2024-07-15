import { User, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/buttons"

interface ConfirmTripModalProps{
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setWonerName: (name: string) => void
    setWonerEmail: (email: string) => void

}


export function ConfirmTripModal ({
    closeConfirmTripModal,
    createTrip,
    setWonerEmail,
    setWonerName
}
:ConfirmTripModalProps) {

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confrimar criaçao de viagems
                </h2>
                <button type="button" onClick={closeConfirmTripModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 text-left">
                Os Para concluir a criação da viagem para{" "}
                <span className="font-semibold text-zinc-100">
                  {" "}
                  Florianópolis, Brasil
                </span>{" "}
                nas datas de{" "}
                <span className="font-semibold text-zinc-100">
                  16 a 27 de Agosto de 2024
                </span>{" "}
                preencha seus dados abaixo:
              </p>
            </div>

            <div className="flex flex-wrap gap-2 "></div>

            <form onSubmit={createTrip} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="text-zinc-400 size-5 " />
                <input
                  type="text"
                  name="name"
                  onChange={event => setWonerName(event.target.value)}
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="text-zinc-400 size-5 " />
                <input
                  type="email"
                  name="email"
                  onChange={event => setWonerEmail(event.target.value)}
                  placeholder="Seu email pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <Button type="submit" variant="primary" size="full">
                Confirmar criaçao da viagem
              </Button>
            </form>
          </div>
        </div>
      )
}