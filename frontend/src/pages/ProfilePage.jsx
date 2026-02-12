import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Camera, Mail, User } from "lucide-react"

function ProfilePage() {

  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };

  }



  return (
    <div className="h-full pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-2xl p-6 space-y-8 shadow-sm border border-base-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
            <p className="mt-2 text-base-content/60">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/user.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 p-1 border-base-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-sm
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/40">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm font-medium text-base-content/40 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-base-200/50 rounded-xl border border-base-200 text-base-content/90 font-medium">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm font-medium text-base-content/40 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-base-200/50 rounded-xl border border-base-200 text-base-content/90 font-medium">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4 text-base-content/80">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-200">
                <span className="text-base-content/60">Member Since</span>
                <span className="font-medium text-base-content">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/60">Account Status</span>
                <span className="text-emerald-500 font-medium bg-emerald-500/10 px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default ProfilePage;