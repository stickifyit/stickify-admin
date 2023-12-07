import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/src/components/ui/dialog"
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import axios from 'axios'
import { useCurrentContainer } from '@/store/currentContainer'
import { BackendHost } from '@/constants/backend'
  
type Props = {}

const CreateStickerSheet = (props: Props) => {
    const [file, setFile] = React.useState<File | null>(null)
    const [name, setName] = React.useState("")
    const [keywords, setKeywords] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [image,setImage]= React.useState<string | null>()
    const [open, setOpen] = React.useState(false)
    const {setReload} = useCurrentContainer()
    const [loading,setLoading]=React.useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setImage(imageDataUrl);
        };
  
        reader.readAsDataURL(file);
      }
    };
    const handleOpen = ()=>{
        setFile(null);
        setName("")
        setKeywords("")
        setDescription("")
        setImage(null)
        setOpen(true)
    }


    const handleCreate = async() => {
                setLoading(true)
                if (!file) {
                    console.error("No file selected.");
                    return;
                }

                // Use FormData to send the file to the server
                const formData = new FormData();
                formData.append("image", file);
                formData.append("folder", "stickers");

                // Use fetch to send the form data to the server
                await fetch(BackendHost+"/images/upload", {
                    method: "POST",
                    body: formData,
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.name)
                    axios.post(BackendHost+"/sticker-sheet/create", {
                        name,
                        description,
                        snapshot: "https://storage.googleapis.com/stickify-storage/"+data.name,
                    }).then((res)=>{
                        setOpen(false)
                        setReload(Math.random())
                        setLoading(false)
                    })
                })
                .catch((error) => {
                console.error("Error uploading image:", error);
                });
    }
  return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
                <Button onClick={handleOpen} className='' size={"lg"}>Create new</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>New Pack</DialogTitle>
            <DialogDescription>
                <div className='flex flex-col gap-2 mt-6'>
                    {
                        image &&
                        <img src={image??""} className='aspect-[2/3] w-[200px] m-2 mx-auto  rounded-xl'  alt="" />
                    }
                    <Input value={name} onInput={(e: any) => setName(e.target.value)} placeholder='name'/>
                    <Input accept='image/*' onChange={(e) => handleImageChange(e)} type='file' placeholder='e.g. sticker.png'/>
                    <Textarea value={description} onInput={(e:any) => setDescription(e.target.value)} placeholder='description'/>
                    <Button disabled={loading} onClick={handleCreate}>
                        {loading ? "Loading..." : "Create"}
                    </Button>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
  )
}

export default CreateStickerSheet 