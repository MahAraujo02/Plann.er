

  import { FormEvent, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { InviteGuestsModal } from "./invite-guests-modal";
  import { ConfirmTripModal } from "./confirm-trip-modal";
  import { DestinationAndDate } from "./steps/destination-and-date-step";
  import { InviteGuestsStep } from "./steps/invite-guests-step";
  import { DateRange } from "react-day-picker";
  import { api } from "../../lib/axios";


  export function CreateTripPage() {
    const navigate = useNavigate()

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDates, seteventStartAndEndDates] = useState<DateRange | undefined>()
  
    const [emailsToInvite, setEmailsToInvite] = useState([""]);
  
    function openGuestsInput() {
      setIsGuestsInputOpen(true);
    }
    function closeGuestsInput() {
      setIsGuestsInputOpen(false);
    }
    function openGuestsModal() {
      setIsGuestsModalOpen(true);
    }
    function closeGuestsModal() {
      setIsGuestsModalOpen(false);
    }
    function openConfirmTripModal() {
      setIsConfirmTripModalOpen(true);
    }
    function closeConfirmTripModal() {
      setIsConfirmTripModalOpen(false);
    }
  
    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const data = new FormData(event.currentTarget);
      const email = data.get("email")?.toString();
  
      if (!email) {
        return;
      }
      if (emailsToInvite.includes(email)) {
        return;
      }
  
      setEmailsToInvite([...emailsToInvite, email]);
  
      event.currentTarget.reset();
    }
  
    function removeEmailFromInvites(emailToRemove: string) {
      const newEmailList = emailsToInvite.filter(
        (email) => email !== emailToRemove
      );
      setEmailsToInvite(newEmailList);
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
    
      if (!destination) {
        console.error("Destination is missing");
        return;
      }
    
      if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
        console.error("Event start or end dates are missing");
        return;
      }
    
      if (emailsToInvite.length === 0) {
        console.error("No emails to invite");
        return;
      }
    
      if (!ownerName || !ownerEmail) {
        console.error("Owner name or email is missing");
        return;
      }
    
      console.log("Sending request to create trip with data:", {
        destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        owner_name: ownerName,
        owner_email: ownerEmail,
        emails_to_invite: emailsToInvite,
      });
    
      try {
        const response = await api.post('/trips', {
          destination,
          starts_at: eventStartAndEndDates.from,
          ends_at: eventStartAndEndDates.to,
          owner_name: ownerName,
          owner_email: ownerEmail,
          emails_to_invite: emailsToInvite,
        });
    
        console.log("Trip created successfully:", response.data);
    
        const { tripId } = response.data;
    
        navigate(`/trips/${tripId}`);
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    }
    
  
    return (
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>
  
          <div className="space-y-4">
          
          < DestinationAndDate 
          closeGuestsInput={closeGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          openGuestsInput={openGuestsInput}
          setDestination={setDestination}
          seteventStartAndEndDates={seteventStartAndEndDates}
          eventStartAndEndDates={eventStartAndEndDates}
          />
  
            {isGuestsInputOpen && (
             <InviteGuestsStep 
             emailsToInvite={emailsToInvite}
             openConfirmTripModal={openConfirmTripModal}
             openGuestsModal={openGuestsModal}
             />
            )}
          </div>
  
          { isGuestsModalOpen && (
            <InviteGuestsModal
            emailsToInvite = {emailsToInvite}
            addNewEmailToInvite = {addNewEmailToInvite}
            closeGuestsModal = {closeGuestsModal}
            removeEmailFromInvites={removeEmailFromInvites}
            />
          )}
  
          {isConfirmTripModalOpen && (
            < ConfirmTripModal 
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setWonerName={setOwnerName}
            setWonerEmail={setOwnerEmail}
            />
          )}

          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda com
            nossos <br />
            <a className="text-zinc-300 underline" href="#">
              termos de uso
            </a>{" "}
            e{" "}
            <a className="text-zinc-300 underline" href="#">
              políticas de privacidade
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
  